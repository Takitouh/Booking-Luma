package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.CreateBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.PutBookingDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseBookingDTO;
import com.Luma_v1.Hotel_Luma.entity.Booking;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.entity.Room;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRoom;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class BookingMapper {
    @Autowired
    protected IRepositoryRoom repositoryRoom;
    @Autowired
    protected IRepositoryGuest repositoryGuest;

    @Mapping(source = "guest", target = "guestName")
    @Mapping(source = "room", target = "roomNumber")
    public abstract ResponseBookingDTO toResponseDTO(Booking booking);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(target = "id", ignore = true)
    public abstract Booking toEntity(CreateBookingDTO createBookingDTO);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(target = "id", ignore = true)
    public abstract Booking toEntity(PutBookingDTO putBookingDTO);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(target = "id", ignore = true)
    public abstract Booking toEntity(PatchBookingDTO patchBookingDTO);

    @SuppressWarnings("unused")
    protected Room givenIDRoom_returnRoomEntity(Long idRoom) {
        return repositoryRoom.findById(idRoom).orElseThrow(EntityNotFoundException::new);
    }

    @SuppressWarnings("unused")
    protected Guest givenIDGuest_returnGuestEntity(Long idGuest) {
        return repositoryGuest.findById(idGuest).orElseThrow(EntityNotFoundException::new);
    }

    @SuppressWarnings("unused")
    protected String givenIDRoom_returnRoomNumber(Room room) {
        return room.getNumber();
    }

    @SuppressWarnings("unused")
    protected String givenIDGuest_returnGuestFullName(Guest guest) {
        return guest.getFirstName() + " " + guest.getLastName();
    }
}