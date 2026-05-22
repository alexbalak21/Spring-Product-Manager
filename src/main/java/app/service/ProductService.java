package app.service;

import app.dto.ProductInput;
import app.model.Product;
import app.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> findAll() {
        return repo.findAll();
    }

    public Product findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product create(ProductInput input) {
        Product p = new Product();
        p.setName(input.name());
        p.setDescription(input.description());
        p.setPrice(input.price());
        return repo.save(p);
    }

    public Product update(Long id, ProductInput input) {
        Product p = repo.findById(id).orElseThrow();
        p.setName(input.name());
        p.setDescription(input.description());
        p.setPrice(input.price());
        return repo.save(p);
    }

    public boolean delete(Long id) {
        repo.deleteById(id);
        return true;
    }
}
