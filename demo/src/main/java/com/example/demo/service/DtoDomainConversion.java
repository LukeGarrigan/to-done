package com.example.demo.service;

public interface DtoDomainConversion<T, E> {

    /**
     * Perform a conversion from a domain object to a data transfer object
     * in an attempt to reduce the number of domain entities at the controller level
     * @param domain
     * @return
     */
    T toDto(E domain);
}
