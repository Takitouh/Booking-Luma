package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomHotelNameDTO;
import com.Luma_v1.Hotel_Luma.entity.Room;
import com.Luma_v1.Hotel_Luma.mapper.RoomMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRoom;
import com.Luma_v1.Hotel_Luma.service.IServiceRoom;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRoom implements IServiceRoom {

    private final IRepositoryRoom roomRepository;
    private final RoomMapper roomMapper;

    public ServiceRoom(IRepositoryRoom roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    @Override
    public List<ResponseRoomHotelNameDTO> findAll() {
        return roomRepository.findAll().stream().map(room -> roomMapper.toResponseRoomHotelNameDTO(room)).collect(Collectors.toList());
    }

    @Override
    public ResponseRoomHotelNameDTO findById(Long id) {
        return roomMapper.toResponseRoomHotelNameDTO(roomRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public ResponseRoomHotelNameDTO save(CreateRoomDTO room) {
        Room roomEntity = roomMapper.toEntity(room);
        return roomMapper.toResponseRoomHotelNameDTO(roomRepository.save(roomEntity));
    }

    @Override
    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }
}