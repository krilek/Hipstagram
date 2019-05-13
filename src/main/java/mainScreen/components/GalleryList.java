package mainScreen.components;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.ListView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.GridPane;
import models.Gallery;

import java.io.IOException;
import java.util.ArrayList;
//Jeez why I didn't inherited list...
public class GalleryList extends GridPane {
    private static final String viewFxml = "/views/components/GalleryList.fxml";
    @FXML
    private ListView list;
    public GalleryList() {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(viewFxml));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);
        try {
            fxmlLoader.load();
            if(list.getItems().isEmpty()){
                list.setVisible(false);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void SetGalleriesList(ObservableList<Gallery> galleries){
        if(!galleries.isEmpty()){
            list.setItems(galleries);
        }else{
//            list.setItems(FXCollections.observableList());
        }
    }
    public GalleryList(String imagePath, String imageTitle) {

//        try {
//            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(viewFxml));
//            fxmlLoader.setRoot(this);
//            fxmlLoader.setController(this);
//            fxmlLoader.load();
//            if (!imagePath.isEmpty()) {
//                InputStream input = getClass().getResourceAsStream(imagePath);
//                Image image = new Image(input);
//                this.image.setImage(image);
//            }
//            if (!imageTitle.isEmpty()) {
//                this.title.setText(imageTitle);
//            }
//        } catch (IOException e) {
//            System.out.println("Failed to load " + viewFxml + " or given image " + imagePath + ".");
//        }

    }
}
