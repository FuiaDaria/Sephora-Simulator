package org.example.springskeleton.repository.user;

import org.example.springskeleton.entity.user.ERole;
import org.example.springskeleton.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole role);
}