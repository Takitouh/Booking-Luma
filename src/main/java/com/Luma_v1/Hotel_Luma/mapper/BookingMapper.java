package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Booking;
import com.Luma_v1.Hotel_Luma.entity.Guest;
import com.Luma_v1.Hotel_Luma.entity.Room;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryGuest;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRoom;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.*;
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

    @Mapping(source = "guest", target = "guestName")
    @Mapping(source = "room", target = "roomNumber")
    @Mapping(source = "room", target = "hotelDetails")
    public abstract GuestBookingDTO toGuestBookingDTO(Booking booking);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "method", ignore = true)
    @Mapping(target = "currency", ignore = true)
    @Mapping(target = "intent", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", ignore = true)

    public abstract Booking toEntity(CreateBookingDTO createBookingDTO);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "method", ignore = true)
    @Mapping(target = "currency", ignore = true)
    @Mapping(target = "intent", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    public abstract Booking toEntity(PutBookingDTO putBookingDTO);

    @Mapping(source = "checkIn", target = "checkIn")
    @Mapping(source = "checkOut", target = "checkOut")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "guestId", target = "guest")
    @Mapping(source = "roomId", target = "room")
    @Mapping(source = "totalPrice", target = "totalPrice")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "method", ignore = true)
    @Mapping(target = "currency", ignore = true)
    @Mapping(target = "intent", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract Booking toEntity(PatchBookingDTO patchBookingDTO, @MappingTarget Booking booking);

    @SuppressWarnings("unused")
    protected HotelNameLocationDTO givenIdRoom_returnHotelNameLocation(Room room){
        return repositoryRoom.findHotelNameLocationById(room.getId());
    }





    @SuppressWarnings("unused")
    protected Room givenIDRoom_returnRoomEntity(Long idRoom) {
        return repositoryRoom.findById(idRoom).orElseThrow(EntityNotFoundException::new);
    }

    @SuppressWarnings("unused")
    protected Guest givenIDGuest_returnGuestEntity(Long idGuest) {
        return repositoryGuest.findById(idGuest).orElseThrow(EntityNotFoundException::new);
    }

    @SuppressWarnings("unused")
    protected String givenRoom_returnRoomNumber(Room room) {
        return room.getNumber();
    }

    @SuppressWarnings("unused")
    protected String givenGuest_returnGuestFullName(Guest guest) {
        return guest.getFirstName() + " " + guest.getLastName();
    }
}
