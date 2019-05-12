package models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Photos")
//@org.hibernate.annotations.NamedQueries({
//        @org.hibernate.annotations.NamedQuery(name = "User_FindByLogin",
//                query = "from Users where login = :employeeNo"),
////        @org.hibernate.annotations.NamedQuery(name = "DeptEmployee_FindAllByDesgination",
////                query = "from DeptEmployee where designation = :designation"),
////        @org.hibernate.annotations.NamedQuery(name = "DeptEmployee_UpdateEmployeeDepartment",
////                query = "Update DeptEmployee set department = :newDepartment where employeeNumber = :employeeNo"),
////        ...
//        })
public class Photo implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    @Column(name = "filename", unique = true)
    private String filename;

    public Photo() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Photo(String filename) {
        this.filename = filename;
    }
}