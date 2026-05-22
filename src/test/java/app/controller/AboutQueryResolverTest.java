package app.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.graphql.test.tester.GraphQlTester;

import static org.assertj.core.api.Assertions.assertThat;

@GraphQlTest(AboutQueryResolver.class)
class AboutQueryResolverTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void about_returnsMessage() {
        graphQlTester.document("{ about }")
                .execute()
                .path("about")
                .entity(String.class)
                .satisfies(text -> assertThat(text).contains("Product Manager"));
    }
}
