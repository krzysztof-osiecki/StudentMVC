package javahive.angualrspringapp.controller;

import java.util.List;

import javahive.api.StudenciApi;
import javahive.api.dto.StudentDTO;
import javahive.api.dto.WykladDTO;
import javahive.api.dto.ZaliczenieDTO;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/studenci")//raz...
public class StudentController {

    @Inject
    private StudenciApi studenciApi;

    @RequestMapping("/lista")//...dwa...
    public @ResponseBody//...trzy i mamy jsona
    List<StudentDTO> getStudentList() {
        return studenciApi.getListaWszystkichStudentow();
    }

    @RequestMapping("/ping")
    public @ResponseBody
    String getPing() {
        return "pong";
    }
        
    @RequestMapping("/wykladyStudenta")
    public @ResponseBody 
    List<ZaliczenieDTO> getWykladyStudenta(
            @RequestParam(value="studentId") int studentId){
            return studenciApi.pobierzZaliczenia(studentId);
        //return studentId;
        //return null;
    }
}
