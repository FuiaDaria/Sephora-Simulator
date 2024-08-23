package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.review.ReviewDto;
import org.example.springskeleton.dto.review.ReviewRequestDto;
import org.example.springskeleton.entity.review.Review;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    ReviewDto fromEntity(Review review);

    Review fromDto(ReviewDto reviewDto);

    ReviewRequestDto entityToRequestDTO(Review review);
    Review requestDtoToEntity(ReviewRequestDto reviewRequestDto);
    List<ReviewDto> entitiesToDtos(List<Review> list);
}
