package wrappercontroller

import (
	"fileServer/util/rate_limiter"
	"fmt"
	"net/http"
)

type WrappedHandlerFunc func(w http.ResponseWriter, r *http.Request)

func WrapWithConcurrencyLimiter(rl rate_limiter.RateLimiter, innerFunc WrappedHandlerFunc) WrappedHandlerFunc {
	var retFunc WrappedHandlerFunc
	retFunc = func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(rl.Status())
		if rl.GetToken() {
			innerFunc(w, r)
			defer rl.ReturnToken()
		} else {
			w.Write([]byte("Try again after some time"))
		}
	}
	return retFunc
}
