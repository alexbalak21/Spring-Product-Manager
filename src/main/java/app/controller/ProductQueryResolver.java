package app.controller;

import app.model.Product;
import app.service.ProductService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductQueryResolver {

    private final ProductService service;

    public ProductQueryResolver(ProductService service) {
        this.service = service;
    }

    @QueryMapping
    public List<Product> products() {
        return service.findAll();
    }

    @QueryMapping
    public Product product(@Argument Long id) {
        return service.findById(id);
    }
}
