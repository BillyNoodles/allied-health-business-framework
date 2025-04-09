/**
 * Debug utilities for development
 */

const DEBUG = process.env.NODE_ENV === 'development'

/**
 * Enhanced console.log for development
 */
export function debug(...args: any[]) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args)
    }
}

/**
 * Performance measurement utility
 */
export function measurePerformance(name: string) {
    if (DEBUG) {
        const start = performance.now()
        return () => {
            const end = performance.now()
            console.log(`[PERF] ${name}: ${Math.round(end - start)}ms`)
        }
    }
    return () => { }
}

/**
 * State change tracker for debugging
 */
export function trackStateChange<T>(name: string, prevState: T, newState: T) {
    if (DEBUG) {
        console.group(`[STATE] ${name}`)
        console.log('Previous:', prevState)
        console.log('Current:', newState)
        console.log('Changed:', JSON.stringify(newState) !== JSON.stringify(prevState))
        console.groupEnd()
    }
}

/**
 * API request logger
 */
export function logApiRequest(method: string, url: string, body?: any) {
    if (DEBUG) {
        console.group(`[API] ${method} ${url}`)
        if (body) console.log('Body:', body)
        console.groupEnd()
    }
}

/**
 * Supabase query debugger
 */
export function debugSupabaseQuery(query: any) {
    if (DEBUG) {
        console.group('[SUPABASE]')
        console.log('Query:', query.toString())
        console.groupEnd()
    }
    return query
} 