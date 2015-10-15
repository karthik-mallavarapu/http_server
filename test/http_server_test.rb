require 'minitest/autorun'
require 'http_server'

class HttpServerTest < Minitest::Test

  class TestRunner
    include HttpServer
  end

  def setup
    @runner = TestRunner.new
  end

  def test_valid_request_parsing
    request = "GET /docxs.html HTTP/1.1"
    assert_equal @runner.parse_request(request), "/docxs.html"
  end

  def test_invalid_request_parsing
    request = "POST / HTTP/1.1"
    assert_raises BadRequestException do
      @runner.parse_request(request)
    end
    request = "GET / TCP/1.1"
    assert_raises BadRequestException do
      @runner.parse_request(request)
    end
  end

  def test_render_valid_filename
    filename = "/index.html"
    file_contents = File.read("public/index.html")
    status_code, body = @runner.render(filename)
    assert_equal status_code, "200 OK"
    assert_equal body, file_contents
  end

  def test_render_file_without_extension
    filename = "/index"
    file_contents = File.read("public/index.html")
    status_code, body = @runner.render(filename)
    assert_equal status_code, "200 OK"
    assert_equal body, file_contents
  end

  def test_render_root_page
    filename = "/"
    file_contents = File.read("public/index.html")
    status_code, body = @runner.render(filename)
    assert_equal status_code, "200 OK"
    assert_equal body, file_contents
  end

  def test_render_404_pages
    filename = "/do_not_exist.html"
    file_contents = File.read("public/404.html")
    status_code, body = @runner.render(filename)
    assert_equal status_code, "404 Not Found"
    assert_equal body, file_contents
  end
end
