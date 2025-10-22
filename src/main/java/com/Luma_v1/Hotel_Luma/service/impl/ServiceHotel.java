package com.Luma_v1.Hotel_Luma.service.impl;

import com.Luma_v1.Hotel_Luma.dto.*;
import com.Luma_v1.Hotel_Luma.entity.Hotel;
import com.Luma_v1.Hotel_Luma.mapper.HotelMapper;
import com.Luma_v1.Hotel_Luma.repository.IRepositoryHotel;
import com.Luma_v1.Hotel_Luma.service.IServiceHotel;
import com.Luma_v1.Hotel_Luma.service.IServiceRoom;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ServiceHotel implements IServiceHotel {

    private final IRepositoryHotel hotelRepository;
    private final HotelMapper hotelMapper;
    private final IServiceRoom serviceRoom;

    public ServiceHotel(IRepositoryHotel hotelRepository, HotelMapper hotelMapper, IServiceRoom serviceRoom) {
        this.hotelRepository = hotelRepository;
        this.hotelMapper = hotelMapper;
        this.serviceRoom = serviceRoom;
    }

    @Override
    public List<ResponseHotelDTO> findAll() {
        return hotelRepository.findAllHotels().stream().map(hotel -> hotelMapper.toResponseDTO(hotel)).collect(Collectors.toList());
    }

    @Override
    public ResponseHotelDTO findById(Long id) {
        return hotelMapper.toResponseDTO(hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public ResponseHotelDTO save(CreateHotelDTO hotel) {
        Hotel hotelEntity = hotelMapper.toEntity(hotel);
        hotelRepository.save(hotelEntity);
        return hotelMapper.toResponseDTO(hotelRepository.save(hotelEntity));
    }

    @Override
    public List<ResponseHotelDTO> saveAll(List<CreateHotelDTO> hotels) {
        List<Hotel> hotelList = new ArrayList<>();
        List<ResponseHotelDTO> responses = new ArrayList<>();
        for (CreateHotelDTO hotelDTO : hotels) {
            hotelList.add(hotelMapper.toEntity(hotelDTO));
        }
        hotelRepository.saveAll(hotelList);
        for (Hotel hotel : hotelList) {
            responses.add(hotelMapper.toResponseDTO(hotel));
        }
        return responses;
    }

    @Override
    public void deleteById(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public ResponseHotelDTO updateWithPut(PutHotelDTO hotel, Long id) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Hotel newHotel = hotelMapper.toEntity(hotel);

        oldHotel.setName(newHotel.getName());
        oldHotel.setLocation(newHotel.getLocation());
        oldHotel.setRooms(newHotel.getRooms());
        hotelRepository.save(oldHotel);

        return hotelMapper.toResponseDTO(oldHotel);
    }

    @Override
    public ResponseHotelDTO updateWithPatch(PatchHotelDTO hotel, Long id) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Hotel newHotel = hotelMapper.toEntity(hotel, oldHotel);

        oldHotel.setName(newHotel.getName() != null ? newHotel.getName() : oldHotel.getName());
        oldHotel.setLocation(newHotel.getLocation() != null ? newHotel.getLocation() : oldHotel.getLocation());
        oldHotel.setRooms(newHotel.getRooms() != null ? newHotel.getRooms() : oldHotel.getRooms());
        hotelRepository.save(oldHotel);

        return hotelMapper.toResponseDTO(oldHotel);
    }

    @Override
    public String uploadHotelImage(MultipartFile file, Long idHotel) throws IOException {
        Hotel hotel = hotelRepository.findById(idHotel).orElseThrow(EntityNotFoundException::new);
        log.info("Size: {}", file.getSize());

        hotel.setNameContent(file.getName());
        hotel.setTypeContent(file.getContentType());
        hotel.setImageContent(file.getBytes());

        hotelRepository.save(hotel);
        return "The image has been uploaded";
    }

    @Override
    public Hotel downloadHotelImage(Long idHotel) {

        return hotelRepository.findById(idHotel).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public ResponseHotelDTO findByName(String name) throws BadRequestException {
        if (name == null) {
            throw new BadRequestException();
        } else if (name.isEmpty()) {
            throw new BadRequestException();
        }

        name = name.trim();

        Hotel hotel = hotelRepository.findByName(name);


        return hotelMapper.toResponseDTO(hotel);
    }
    @Transactional
    @Override
    public void registerHotel(CreateHotelDTO hotelDTO, List<CreateRoomDTO> roomDTOS, MultipartFile file) throws IOException {
        log.info("Starting register of a hotel");
        try {
            // First: save the hotel
            ResponseHotelDTO responseHotelDTO = this.save(hotelDTO);
            final Long idHotel = responseHotelDTO.id();
            log.info("Hotel created with ID:{}", idHotel);

            // Second: upload the image
            log.debug("Uploading image for the hotel with ID:{}", idHotel);
            String responseImage = this.uploadHotelImage(file, idHotel);
            log.info("Image was uploaded for the hotel with ID:{} (response: {})", idHotel, responseImage);

            // Third: save the list of rooms
            log.debug("Saving {} rooms for the hotel with ID:{}", roomDTOS == null ? 0 : roomDTOS.size(), idHotel);
            roomDTOS = this.assignHotelIdToRooms(roomDTOS, idHotel);
            List<ResponseRoomHotelNameDTO> responseRoomDTOS = serviceRoom.saveAll(roomDTOS);
            log.info("It did register {} rooms for the hotel with ID:{}", responseRoomDTOS == null ? 0 : responseRoomDTOS.size(), idHotel);

            log.info("Register finalized of the hotel with ID:{}", idHotel);
        } catch (IOException e) {
            log.error("Error in the upload of the image", e);
            throw e;
        } catch (Exception e) {
            log.error("There was an unexpected error", e);
            throw e;
        }
    }

    private List<CreateRoomDTO> assignHotelIdToRooms(List<CreateRoomDTO> rooms, Long idHotel) {
        List<CreateRoomDTO> newRooms = new ArrayList<>();
        for (CreateRoomDTO room : rooms) {
            CreateRoomDTO roomDTO = new CreateRoomDTO(room.number(), room.fee(), idHotel);
            newRooms.add(roomDTO);
        }

       return newRooms;
    }

}