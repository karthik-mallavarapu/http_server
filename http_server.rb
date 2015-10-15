require 'socket'
# Custom exception class for bad requests
class BadRequestException < Exception
end

# Http Server capable of serving static files from the public directory
module HttpServer

  # Listens on port 4343 for client connections. A client request is parsed,
  # appropriate file contents are rendered along with respective HTTP status
  # codes.
  def start_server
    server = TCPServer.new('localhost', '4343')
    puts "Web server is running\nUse the url http://localhost:4343 to access it."
    loop do
      client = server.accept
      request = client.gets
      begin
        filename = parse_request(request)
        status_code, response_body = render(filename)
      rescue BadRequestException 
        filename = '/400.html'
        status_code = "400 Bad Request"
        response_body = read_file(filename)
      end
      client.print response_headers(status_code, filename, response_body.bytesize)
      client.print "\r\n"
      client.print response_body
      client.close
    end
  end

  # Returns the requested filename. Raises an exception for bad requests.
  def parse_request(request)
    request_method, filename, protocol = request.split(' ')
    if request_method != 'GET' || protocol != 'HTTP/1.1'
      raise BadRequestException
    end
    filename
  end

  # Response begins with protocol, mime type, response body size
  def response_headers(status_code, filename, content_len)
    "HTTP/1.1 #{status_code}\r\n" +
    "Content-Type: #{mime_type(filename)}\r\n" +
    "Content-Length: #{content_len}\r\n" +
    "Connection: close\r\n"
  end

  # Return the contents of requested filename
  def render(filename)
    return "200 OK", read_file('/index.html') if filename == '/'
    inferred_filename = filename.include?('.') ? filename : filename+".html"
    return "404 Not Found", read_file('/404.html') unless File.exists?("public#{inferred_filename}")
    return "200 OK", read_file(inferred_filename)
  end

  private

  # Returns the file contents of the requested file. For '/', index.html is
  # returned.
  def read_file(filename)
    File.read("public#{filename}")
  end

  # Returns the mime type of the requested file based on the extension.
  # Supported mime types are txt, html and png
  def mime_type(filename)
    content_types = {
      "html" => "text/html",
      "txt" => "text/plain",
      "png" => "image/png"
    }
    ext = filename.include?('.') ? filename.split('.').last : "html"
    return content_types[ext]
  end
end
