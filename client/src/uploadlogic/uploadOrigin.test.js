import getOriginIp from "./uploadOrigin";
test("give ip when backend service is up", () => {
  expect(getOriginIp()).toBe("192.168.1.10");
});
