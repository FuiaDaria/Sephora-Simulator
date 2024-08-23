
package org.example.springskeleton.example;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.example.dto.ExampleDto;
import org.example.springskeleton.example.dto.ExampleRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.example.springskeleton.globals.UrlMapping.EXAMPLE_ID_PATH;
import static org.example.springskeleton.globals.UrlMapping.EXAMPLE_PATH;

@RestController
@RequestMapping(EXAMPLE_PATH)
@RequiredArgsConstructor
public class ExampleController {

  private final ExampleService exampleService;

  @PostMapping
  public ExampleDto create(@RequestBody @Valid ExampleRequestDto reqDto) {
    return exampleService.create(reqDto.getName());
  }

  @GetMapping(EXAMPLE_ID_PATH)
  public ResponseEntity<ExampleDto> findById(@PathVariable Long id) {
    return exampleService.findById(id);
  }


}