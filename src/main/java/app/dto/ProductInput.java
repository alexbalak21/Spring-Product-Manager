package app.dto;

public record ProductInput(
        String name,
        String description,
        double price
) {}
