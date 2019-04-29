package models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "UserGalleries")
public class UserGallery implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "login", unique = true)
    private String login;
    @Column(name = "passwordHash")
    private String passwordHash;
    @Column(name = "email")
    private String email;
    @Column(name = "admin")
    private int admin;

    public UserGallery() {
    }

    public UserGallery(String login, String passwordHash, String email, int isAdmin) {
        this.login = login;
        this.passwordHash = passwordHash;
        this.email = email;
        this.admin = isAdmin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", email='" + email + '\'' +
                ", admin=" + admin +
                '}';
    }

    public int getAdmin() {
        return admin;
    }

    public void setAdmin(int admin) {
        this.admin = admin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}