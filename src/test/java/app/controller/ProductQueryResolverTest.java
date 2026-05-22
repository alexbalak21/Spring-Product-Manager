package app.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import static org.assertj.core.api.Assertions.assertThat;

@GraphQlTest(ProductQueryResolver.class)
class ProductQueryResolverTest {
    @Autowired
    ProductQueryResolver resolver;

    @Test
    void contextLoads() {
        assertThat(resolver).isNotNull();
    }
}
