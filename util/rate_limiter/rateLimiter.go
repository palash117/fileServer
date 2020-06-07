package rate_limiter

import (
	"fmt"
	"sync"
	"time"
)

type rateLimiter struct {
	limit   int
	timeout time.Duration
	mutex   sync.Mutex
}

func (r *rateLimiter) Status() string {
	return fmt.Sprintf("available: %d", r.limit)
}

func (r *rateLimiter) GetToken() bool {
	tokenAvailable := true
	r.mutex.Lock()
	if r.limit > 0 {
		r.limit--
	} else {
		tokenAvailable = false
	}
	r.mutex.Unlock()
	return tokenAvailable
}

func (r *rateLimiter) ReturnToken() {
	r.mutex.Lock()
	r.limit++
	r.mutex.Unlock()
}

type RateLimiter interface {
	GetToken() bool
	ReturnToken()
	Status() string
}

// CreateRateLimiter returns a rateLimiter interface which can be used to limit api calls / function calls
func CreateRateLimiter(limit int) RateLimiter {
	return &rateLimiter{limit: limit}
}
