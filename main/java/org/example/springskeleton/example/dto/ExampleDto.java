package org.example.springskeleton.example.dto;

import lombok.*;
import org.example.springskeleton.example.Example;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExampleDto {
  private Long id;
  private String name;

  public static ExampleDto fromEntity(Example example) {
    return ExampleDto.builder()
        .id(example.getId())
        .name(example.getName())
        .build();
  }
}
