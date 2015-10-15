require_relative 'http_server'

class HttpServerRunner
  include HttpServer
end

runner = HttpServerRunner.new
runner.start_server
