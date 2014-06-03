package javahive.angualrspringapp.controller;

import java.util.List;

import javahive.api.StudenciApi;
import javahive.api.dto.OcenaDTO;
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
    }
    
    @RequestMapping("/usunStudenta")
    public @ResponseBody 
    boolean usunStudenta(
            @RequestParam(value="studentId") int studentId){
            return studenciApi.usunStudenta(studentId);
    }
    
    @RequestMapping("/wystawOcene")
    public @ResponseBody
    boolean wystawOcene(
            @RequestParam(value="zaliczenieId") int idZaliczenia,
            @RequestParam(value="ocena") int ocena
            ){
        return studenciApi.wystawOcene(idZaliczenia, ocena);
    }

    @RequestMapping("/pobierzWyklady")
    public @ResponseBody
    List<WykladDTO> pobierzWyklady(){
        return studenciApi.getListaWszystkichWykladow();
    }
    
    @RequestMapping("/pobierzOceny")
    public @ResponseBody
    List<OcenaDTO> pobierzOceny(){
        return studenciApi.pobierzOceny();
    }
    
    @RequestMapping("/zapiszDaneStudenta")
    public @ResponseBody
    boolean zapiszDaneStudenta(
            @RequestParam(value = "studentId") int studentId,
            @RequestParam(value = "imie") String imie,
            @RequestParam(value = "nazwisko") String nazwisko){
        return studenciApi.edytujDaneStudenta(studentId, imie, nazwisko);
    };
    
    @RequestMapping("/szukajStudentow")
    public @ResponseBody
    List<StudentDTO> szukajStudentow(
            @RequestParam(value="studentIndex") String index,
            @RequestParam(value="studentName") String imie,
            @RequestParam(value="studentSurname") String nazwisko
            ){
        
        if(index != null){
            ///bleh
        }
        
        //return studenciApi.
        return null;
    };
    
    @RequestMapping("/dodajStudenta")
    public @ResponseBody
    boolean dodajStudenta(
            @RequestParam(value="studentName") String imie,
            @RequestParam(value="studentSurname") String nazwisko,
            @RequestParam(value="lectures") String wykladyIds
            ){
        return studenciApi.utworzStudenta(imie, nazwisko, wykladyIds);
        //return false;
    }
    
    
}
