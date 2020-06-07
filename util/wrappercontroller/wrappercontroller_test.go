package wrappercontroller

import (
	"fileServer/util/rate_limiter"
	"fmt"
	"net/http"
	"testing"
)

func TestConcurrencyLimiterWrapper(t *testing.T){
	rl:= rate_limiter.CreateRateLimiter(10)
	var temp WrappedHandlerFunc
	temp = WrapWithConcurrencyLimiter(rl, func(w http.ResponseWriter, r *http.Request){})	
	fmt.Printf("%v", temp)
}