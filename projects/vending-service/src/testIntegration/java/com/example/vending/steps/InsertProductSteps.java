package com.example.vending.steps;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class InsertProductSteps {

    @Autowired
    private MockMvc mockMvc;

    private ResultActions result;

    @When("I post to {string}")
    public void i_post_to(String path) throws Exception {
        result = mockMvc.perform(post(path));
    }

    @Then("the response status should be {int}")
    public void the_response_status_should_be(Integer status) throws Exception {
        result.andExpect(status().is(status));
    }

    @Then("the response should be {string}")
    public void the_response_should_be(String body) throws Exception {
        result.andExpect(content().string(body));
    }
}
