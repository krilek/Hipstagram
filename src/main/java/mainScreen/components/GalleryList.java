package mainScreen.components;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

public class GalleryList extends AnchorPane {
    private static final String viewFxml = "/views/components/GalleryList.fxml";
    ObservableList observableArrayList = FXCollections.observableArrayList();

    public GalleryList() {
        observableArrayList.add("XD");
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(viewFxml));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);
        try {
            fxmlLoader.load();
        } catch (IOException e) {
            e.printStackTrace();
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
