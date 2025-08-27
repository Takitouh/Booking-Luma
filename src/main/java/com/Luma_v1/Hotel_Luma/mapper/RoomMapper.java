package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.entity.Room;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryHotel;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {BookingMapper.class})
public abstract class RoomMapper {

    @Autowired
    protected IRepositoryHotel repositoryHotel;
    //# DTO for response when one or more hotels are required, the rooms haven't the hotel name
    @Mapping(source = "number", target = "number")
    @Mapping(source = "normalFee", target = "normalFee")
    @Mapping(source = "dayUseFee", target = "dayUseFee")
    public abstract ResponseRoomDTO toResponseRoomHotelDTO(Room room);
    //# DTO for response when one or more room are specified, it has the hotel name
    @Mapping(source = "number", target = "number")
    @Mapping(source = "hotel", target = "hotelName")
    public abstract ResponseRoomHotelNameDTO toResponseRoomHotelNameDTO(Room room);

    @Mapping(source = "number", target = "number")
    @Mapping(source = "normalFee", target = "normalFee")
    @Mapping(source = "dayUseFee", target = "dayUseFee")
    @Mapping(source = "idHotel", target = "hotel")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    public abstract Room toEntity(CreateRoomDTO createRoomDTO);

    @Mapping(source = "number", target = "number")
    @Mapping(source = "normalFee", target = "normalFee")
    @Mapping(source = "dayUseFee", target = "dayUseFee")
    @Mapping(source = "idHotel", target = "hotel")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    public abstract Room toEntity(PutRoomDTO putRoomDTO);

    @Mapping(source = "number", target = "number")
    @Mapping(source = "normalFee", target = "normalFee")
    @Mapping(source = "dayUseFee", target = "dayUseFee")
    @Mapping(source = "idHotel", target = "hotel")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bookings", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract Room toEntity(PatchRoomDTO patchRoomDTO, @MappingTarget Room room);

    @SuppressWarnings("unused")
    protected Hotel givenIDHotel_returnHotelEntity(Long idHotel) {
        return repositoryHotel.findById(idHotel).orElseThrow(EntityNotFoundException::new);
    }

    @SuppressWarnings("unused")
    protected String givenIDHotel_returnHotelName(Hotel hotel) {
        return hotel.getName();
    }
}
