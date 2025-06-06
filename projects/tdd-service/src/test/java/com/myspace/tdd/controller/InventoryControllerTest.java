package com.myspace.tdd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
@AutoConfigureMockMvc
@RequiredArgsConstructor
public class InventoryControllerTest {

    private final MockMvc mockMvc;

    void insertProducts_shouldReturnOk(){

    }

}
