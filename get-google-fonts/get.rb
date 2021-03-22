#! /usr/bin/env ruby

require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'excon'
end

require 'fileutils'
require 'yaml'
require 'json'
require 'digest/md5'

def build_folder
  File.expand_path(__dir__ + "/output")
end

def public_folder
  File.expand_path(__dir__ + "/../public")
end

def config
  data = File.read("./config.yaml")
  return YAML.load(data)
end

def http_request(url)
  ua = config["user_agent"].strip
  resp = Excon.get(url, {headers: {"User-Agent": ua, "DNT": 1}})
  return resp.body
end

def extract_fonts_url(css_or_url)
  body = css_or_url =~ /^https/i ? http_request(css_or_url) : css_or_url
  return body.scan(/url\(([^\\)]+)\)/).flatten.uniq.sort
end

def download_font(font_url)
  ua = config["user_agent"].strip
  font_content = http_request(font_url)
  filename = Digest::MD5.hexdigest(font_url.downcase) + File.extname(font_url).downcase
  File.open(build_folder + "/fonts/" + filename, "wb") { |f| f.write(font_content) }
  return filename
end

def main
  # clean up the public folder
  FileUtils.rm_rf(public_folder + "/fonts")
  FileUtils.rm_f(public_folder + "/fonts.css")

  # clean up the build folder
  FileUtils.rm_rf(build_folder)
  FileUtils.mkdir_p(build_folder)
  FileUtils.mkdir_p(build_folder + "/fonts/")

  config["link_tags_urls"].map(&:strip).each do |url|
    puts "IMPORT: #{url}"

    css = http_request(url)
    extract_fonts_url(css).each do |font_url|
      filename = download_font(font_url)
      css.gsub!(font_url, "fonts/#{filename}")
    end
    File.open(build_folder+"/fonts.css", "ab") { |f| f.puts(css) }
  end

  # copy the output back to the public folder
  FileUtils.cp build_folder+"/fonts.css", public_folder
  FileUtils.cp_r build_folder+"/fonts/", public_folder
  
  # clean up the build folder
  FileUtils.rm_rf(build_folder)
end

if $0 == __FILE__
  main
end