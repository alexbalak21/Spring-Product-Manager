package app.controller;

import app.dto.ProductInput;
import app.model.Product;
import app.service.ProductService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class ProductMutationResolver {

    private final ProductService service;

    public ProductMutationResolver(ProductService service) {
        this.service = service;
    }

    @MutationMapping
    public Product createProduct(@Argument ProductInput input) {
        return service.create(input);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument ProductInput input) {
        return service.update(id, input);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        return service.delete(id);
    }
}
