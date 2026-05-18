import { useState, useEffect, useCallback } from 'react'
import { Flame, ChevronDown, Loader2, CheckCheck, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { getVoterId, getVotedPains, markAsVoted } from '../lib/voterId'
import { useLanguage } from '../context/LanguageContext'

const PAGE_SIZE = 6

function PainCard({ pain, voted, onVote, voting, labels }) {
  return (
    <div className="card p-5 flex flex-col justify-between gap-4 hover:border-orange-500/20 transition-colors duration-300">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex-shrink-0">
          {pain.category}
        </span>
        <div className="flex items-center gap-1.5 text-gray-600 flex-shrink-0">
          <Flame size={13} className={pain.votes > 0 ? 'text-forge-fire' : ''} />
          <span className="text-sm font-semibold tabular-nums">{pain.votes}</span>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed flex-1 line-clamp-4 break-words">
        "{pain.description}"
      </p>

      {pain.current_solution && (
        <p className="text-gray-700 text-xs italic truncate">
          {labels.today}: {pain.current_solution}
        </p>
      )}

      <button
        onClick={() => onVote(pain.id)}
        disabled={voted || voting}
        className={`
          w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold
          border transition-all duration-200
          ${voted
            ? 'bg-green-500/10 border-green-500/30 text-green-400 cursor-default'
            : 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 active:scale-95'
          }
          ${voting ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {voting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : voted ? (
          <><CheckCheck size={14} />{labels.votedBtn}</>
        ) : (
          <><Flame size={14} />{labels.voteBtn}</>
        )}
      </button>
    </div>
  )
}

export default function PainFeed() {
  const { t } = useLanguage()
  const p = t.painFeed

  const [pains, setPains] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)
  const [activeCat, setActiveCat] = useState(p.categories[0])
  const [votedPains, setVotedPains] = useState(getVotedPains)
  const [votingId, setVotingId] = useState(null)

  const fetchPains = useCallback(async (catValue, pageIndex, append = false) => {
    const from = pageIndex * PAGE_SIZE
    const to   = from + PAGE_SIZE - 1

    let query = supabase
      .from('pains')
      .select('id, category, description, current_solution, votes, created_at')
      .order('votes', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (catValue !== 'Todas') {
      query = query.eq('category', catValue)
    }

    const { data, error } = await query
    if (error) { toast.error(p.errorLoad); return }

    if (append) setPains((prev) => [...prev, ...(data || [])])
    else setPains(data || [])
    setHasMore((data || []).length === PAGE_SIZE)
  }, [p.errorLoad])

  useEffect(() => {
    setLoading(true)
    setPage(0)
    fetchPains(activeCat.value, 0).finally(() => setLoading(false))
  }, [activeCat, fetchPains])

  const handleLoadMore = async () => {
    const next = page + 1
    setLoadingMore(true)
    await fetchPains(activeCat.value, next, true)
    setPage(next)
    setLoadingMore(false)
  }

  const handleVote = async (painId) => {
    if (votedPains.has(painId) || votingId) return

    setVotingId(painId)
    const { data, error } = await supabase.rpc('vote_on_pain', {
      p_pain_id: painId,
      p_voter_id: getVoterId(),
    })
    setVotingId(null)

    if (error) { toast.error(p.errorVote); return }

    if (data?.success === false) {
      toast(p.alreadyVoted, { icon: '👀' })
      markAsVoted(painId)
      setVotedPains((prev) => new Set([...prev, painId]))
      return
    }

    markAsVoted(painId)
    setVotedPains((prev) => new Set([...prev, painId]))
    setPains((prev) => prev.map((item) =>
      item.id === painId ? { ...item, votes: item.votes + 1 } : item
    ))
    toast.success(p.voteSuccess)
  }

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-forge-fire text-sm font-semibold uppercase tracking-widest mb-3">
            {p.label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            {p.heading}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">{p.sub}</p>
        </div>

        {/* Category filter */}
        <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter size={14} className="text-gray-600 flex-shrink-0" />
            {p.categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCat(cat)}
                className={`
                  flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150
                  ${activeCat.value === cat.value
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                    : 'bg-forge-card border-forge-border text-gray-500 hover:text-gray-300 hover:border-gray-600'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-forge-fire" />
          </div>
        ) : pains.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-2">{p.empty}</p>
            <p className="text-gray-700 text-sm">{p.emptyHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pains.map((pain) => (
              <PainCard
                key={pain.id}
                pain={pain}
                voted={votedPains.has(pain.id)}
                onVote={handleVote}
                voting={votingId === pain.id}
                labels={p}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-forge-border text-gray-400 hover:text-white hover:border-gray-600 transition-all text-sm"
            >
              {loadingMore ? <Loader2 size={14} className="animate-spin" /> : <ChevronDown size={14} />}
              {p.loadMore}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <p className="text-gray-600 text-sm mb-3">{p.notFound}</p>
          <a href="#submit" className="btn-fire text-sm px-6 py-2.5 inline-block">
            {p.notFoundCta}
          </a>
        </div>
      </div>
    </section>
  )
}
