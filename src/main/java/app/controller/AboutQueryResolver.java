package app.controller;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class AboutQueryResolver {

    private final String aboutMessage =
            "This Product Manager app is built with Spring Boot, GraphQL, and Astro.";

    @QueryMapping
    public String about() {
        return aboutMessage;
    }
}
