package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PutHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchHotelDTO;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {RoomMapper.class})
public interface HotelMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "location", target = "location")
    @Mapping(source = "scheduleCheckIn", target = "scheduleCheckIn")
    @Mapping(source = "scheduleCheckOut", target = "scheduleCheckOut")
    @Mapping(source = "scheduleDayUseStart", target = "scheduleDayUseStart")
    @Mapping(source = "scheduleDayUseEnd", target = "scheduleDayUseEnd")
    @Mapping(source = "rooms", target = "rooms")
    ResponseHotelDTO toResponseDTO(Hotel hotel);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "scheduleCheckIn", target = "scheduleCheckIn")
    @Mapping(source = "scheduleCheckOut", target = "scheduleCheckOut")
    @Mapping(source = "scheduleDayUseStart", target = "scheduleDayUseStart")
    @Mapping(source = "scheduleDayUseEnd", target = "scheduleDayUseEnd")
    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", ignore = true)
    Hotel toEntity(CreateHotelDTO createHotelDTO);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "scheduleCheckIn", target = "scheduleCheckIn")
    @Mapping(source = "scheduleCheckOut", target = "scheduleCheckOut")
    @Mapping(source = "scheduleDayUseStart", target = "scheduleDayUseStart")
    @Mapping(source = "scheduleDayUseEnd", target = "scheduleDayUseEnd")
    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", ignore = true)
    Hotel toEntity(PutHotelDTO putHotelDTO);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "scheduleCheckIn", target = "scheduleCheckIn")
    @Mapping(source = "scheduleCheckOut", target = "scheduleCheckOut")
    @Mapping(source = "scheduleDayUseStart", target = "scheduleDayUseStart")
    @Mapping(source = "scheduleDayUseEnd", target = "scheduleDayUseEnd")
    @Mapping(source = "rooms", target = "rooms")
    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Hotel toEntity(PatchHotelDTO patchHotelDTO, @MappingTarget Hotel hotel);
}
