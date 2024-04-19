require "test_helper"

class BbertoControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get bberto_show_url
    assert_response :success
  end
end
