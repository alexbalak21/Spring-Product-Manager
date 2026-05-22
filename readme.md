# 📘 Spring Boot GraphQL CRUD API — README

## 🚀 Overview

This project is a simple CRUD API built with:

- Spring Boot  
- Spring for GraphQL  
- Spring Data JPA  
- PostgreSQL  
- GraphQL schema + resolvers  

It exposes a `/graphql` endpoint and provides full CRUD operations for a `Product` entity.

---

## 📦 Project Structure

```
src/main/java/app
│
├── model
│   └── Product.java
│
├── dto
│   └── ProductInput.java
│
├── repository
│   └── ProductRepository.java
│
├── service
│   └── ProductService.java
│
└── controller
    ├── ProductQueryResolver.java
    └── ProductMutationResolver.java

src/main/resources
│
└── graphql
    └── schema.graphqls
```

---

## 🧩 Dependencies

Required dependencies:

- Spring Web  
- Spring Data JPA  
- PostgreSQL Driver  
- Spring for GraphQL  

---

## 🗄️ Database Configuration (`application.yml`)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/productsdb
    username: postgres
    password: password

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

---

# 🧱 1. Model (Entity)

```java
package app.model;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;

    // getters & setters
}
```

---

# 🧾 2. DTO (Input Object)

```java
package app.dto;

public record ProductInput(
        String name,
        String description,
        double price
) {}
```

---

# 🗃️ 3. Repository

```java
package app.repository;

import app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
```

---

# ⚙️ 4. Service Layer

```java
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
```

---

# 🎮 5. GraphQL Schema (`schema.graphqls`)

```graphql
type Query {
  products: [Product!]!
  product(id: ID!): Product
}

type Mutation {
  createProduct(input: ProductInput!): Product!
  updateProduct(id: ID!, input: ProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
}

input ProductInput {
  name: String!
  description: String!
  price: Float!
}

type Product {
  id: ID!
  name: String!
  description: String!
  price: Float!
}
```

---

# 🎯 6. Query Resolver (READ)

```java
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
```

---

# ✏️ 7. Mutation Resolver (CREATE / UPDATE / DELETE)

```java
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
```

---

# 🧪 Testing the API

Use:

- GraphiQL → http://localhost:8080/graphiql  
- Altair GraphQL Client  
- Insomnia (GraphQL mode)  

### Query all products

```graphql
query {
  products {
    id
    name
    price
  }
}
```

### Create product

```graphql
mutation {
  createProduct(input: {
    name: "Laptop"
    description: "Gaming laptop"
    price: 1299.99
  }) {
    id
  }
}
```

### Update product

```graphql
mutation {
  updateProduct(id: 1, input: {
    name: "Updated"
    description: "Updated desc"
    price: 999.99
  }) {
    id
    name
    price
  }
}
```

### Delete product

```graphql
mutation {
  deleteProduct(id: 1)
}
```

