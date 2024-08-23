package org.example.springskeleton.example;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.example.dto.ExampleDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExampleService {
  private final ExampleRepository exampleRepository;

  public ExampleDto create(String name) {
    Example savedInstance = exampleRepository.save(Example.builder().name(name).build());
    return ExampleDto.fromEntity(savedInstance);
  }

  public ResponseEntity<ExampleDto> findById(Long id) {
    return exampleRepository.findById(id)
        .map(example -> ResponseEntity.ok(ExampleDto.fromEntity(example)))
        .orElse(ResponseEntity.notFound().build());
  }
}
