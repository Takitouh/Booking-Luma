package com.Luma_v1.Hotel_Luma.controller;

import com.Luma_v1.Hotel_Luma.dto.CreateRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PatchRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.PutRoomDTO;
import com.Luma_v1.Hotel_Luma.dto.ResponseRoomHotelNameDTO;
import com.Luma_v1.Hotel_Luma.service.IServiceRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rooms")
public class ControllerRoom {

    private final IServiceRoom roomService;

    @Autowired
    public ControllerRoom(IServiceRoom roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ResponseRoomHotelNameDTO>> getAllRooms() {
        return new ResponseEntity<>(roomService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseRoomHotelNameDTO> getRoomById(@PathVariable Long id) {
        return new ResponseEntity<>(roomService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<ResponseRoomHotelNameDTO> createRoom(@RequestBody CreateRoomDTO room) {
        return new ResponseEntity<>(roomService.save(room), HttpStatus.CREATED);
    }

    @PostMapping("/postBatch")
    public ResponseEntity<List<ResponseRoomHotelNameDTO>> createRoom(@RequestBody List<CreateRoomDTO> rooms) {
        return new ResponseEntity<>(roomService.saveAll(rooms), HttpStatus.CREATED);
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<ResponseRoomHotelNameDTO> updateRoom(@PathVariable Long id, @RequestBody PutRoomDTO room) {
        Optional<ResponseRoomHotelNameDTO> existingRoom = Optional.ofNullable(roomService.findById(id));
        if (existingRoom.isPresent()) {
            return new ResponseEntity<>(roomService.updateWithPut(room, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<ResponseRoomHotelNameDTO> updateRoom(@PathVariable Long id, @RequestBody PatchRoomDTO room) {
        Optional<ResponseRoomHotelNameDTO> existingRoom = Optional.ofNullable(roomService.findById(id));
        if (existingRoom.isPresent()) {
            return new ResponseEntity<>(roomService.updateWithPatch(room, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        Optional<ResponseRoomHotelNameDTO> room = Optional.ofNullable(roomService.findById(id));
        if (room.isPresent()) {
            roomService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}