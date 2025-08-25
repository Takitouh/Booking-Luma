package com.Luma_v1.Hotel_Luma.mapper;

import com.Luma_v1.Hotel_Luma.dto.ResponseHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.CreateHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PutHotelDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchHotelDTO;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {RoomMapper.class})
public interface HotelMapper {

    ResponseHotelDTO toResponseDTO(Hotel hotel);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
//    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", ignore = true)
    Hotel toEntity(CreateHotelDTO createHotelDTO);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
//    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", ignore = true)
    Hotel toEntity(PutHotelDTO putHotelDTO);

    @Mapping(source = "location", target = "location")
    @Mapping(source = "name", target = "name")
//    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Hotel toEntity(PatchHotelDTO patchHotelDTO, @MappingTarget Hotel hotel);
}