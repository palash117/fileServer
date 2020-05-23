package wrappercontroller

import (
	"fileServer/util/rate_limiter"
	"net/http"
)

type WrappedHandlerFunc func(w http.ResponseWriter, r *http.Request)

func WrapWithConcurrencyLimiter(rl rate_limiter.RateLimiter, innerFunc WrappedHandlerFunc) WrappedHandlerFunc {
	var retFunc WrappedHandlerFunc
	retFunc = func(w http.ResponseWriter, r *http.Request) {
		if rl.GetToken() {
			innerFunc(w, r)
		} else {
			w.Write([]byte("Try again after some time"))
		}
	}
	return retFunc
}