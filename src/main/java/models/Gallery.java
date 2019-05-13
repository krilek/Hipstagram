package models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Galleries")
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;

    @ManyToMany
    @JoinTable(name = "GalleryPhotos",
    joinColumns = @JoinColumn(name="galleryid"),
    inverseJoinColumns = @JoinColumn(name = "photoid"))
    private Set<Photo> photos;

    @ManyToMany
    @JoinTable(name = "UserGalleries",
    joinColumns = @JoinColumn(name="galleryid"),
    inverseJoinColumns = @JoinColumn(name = "userid"))
    private Set<User> owners;

    public Gallery(String name) {
        this.name = name;
    }

    public Gallery() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Set<User> getOwners() {
        return owners;
    }

    public void setOwners(Set<User> owners) {
        this.owners = owners;
    }

    @Override
    public String toString() {
        return name;
    }
}
