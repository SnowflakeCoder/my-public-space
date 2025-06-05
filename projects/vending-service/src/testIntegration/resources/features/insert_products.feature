Feature: Insert Products

  Scenario: Inserting products into vending machine
    When I post to "/vending/products"
    Then the response status should be 200
    And the response should be "Product Added Successfully."
