package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.CreateRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PutRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomHotelNameDTO;
import com.Luma_v1.Hotel_Luma.entity.Room;
import com.Luma_v1.Hotel_Luma.mapper.RoomMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryRoom;
import com.Luma_v1.Hotel_Luma.service.IServiceRoom;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        roomRepository.save(roomEntity);
        return roomMapper.toResponseRoomHotelNameDTO(roomRepository.save(roomEntity));
    }

    @Override
    public List<ResponseRoomHotelNameDTO> saveAll(List<CreateRoomDTO> rooms) {
        List<Room> roomList = new ArrayList<>();
        List<ResponseRoomHotelNameDTO> responses = new ArrayList<>();
        for (CreateRoomDTO roomDTO : rooms) {
            roomList.add(roomMapper.toEntity(roomDTO));
        }
        roomRepository.saveAll(roomList);
        for (Room room : roomList) {
            responses.add(roomMapper.toResponseRoomHotelNameDTO(room));
        }
        return responses;
    }

    @Override
    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public ResponseRoomHotelNameDTO updateWithPut(PutRoomDTO room, Long id) {
        Room oldRoom = roomRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Room newRoom = roomMapper.toEntity(room);

        oldRoom.setHotel(newRoom.getHotel());
        oldRoom.setNumber(newRoom.getNumber());
        oldRoom.setFee(newRoom.getFee());
        oldRoom.setBookings(newRoom.getBookings());

        roomRepository.save(oldRoom);

        return roomMapper.toResponseRoomHotelNameDTO(oldRoom);
    }

    @Override
    public ResponseRoomHotelNameDTO updateWithPatch(PatchRoomDTO room, Long id) {
        Room oldRoom = roomRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Room newRoom = roomMapper.toEntity(room, oldRoom);

        oldRoom.setHotel(newRoom.getHotel() != null ? newRoom.getHotel() : oldRoom.getHotel());
        oldRoom.setNumber(newRoom.getNumber() != null ? newRoom.getNumber() : oldRoom.getNumber());
        oldRoom.setFee(newRoom.getFee() != null ? newRoom.getFee() : oldRoom.getFee());
        oldRoom.setBookings(newRoom.getBookings() != null ? newRoom.getBookings() : oldRoom.getBookings());

        roomRepository.save(oldRoom);

        return roomMapper.toResponseRoomHotelNameDTO(oldRoom);
    }
}