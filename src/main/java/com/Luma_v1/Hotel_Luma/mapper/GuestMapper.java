package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.ResponseGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.CreateGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.PutGuestDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchGuestDTO;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GuestMapper {
    ResponseGuestDTO toResponseDTO(Guest guest);

    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "phone", target = "phone")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Guest toEntity(CreateGuestDTO createGuestDTO);
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "phone", target = "phone")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Guest toEntity(PutGuestDTO putGuestDTO);
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "phone", target = "phone")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    Guest toEntity(PatchGuestDTO patchGuestDTO);
}