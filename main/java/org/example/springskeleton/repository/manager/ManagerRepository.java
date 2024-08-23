package org.example.springskeleton.repository.manager;

import org.example.springskeleton.entity.manager.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

    Manager findByUser_Id(long id);
}

