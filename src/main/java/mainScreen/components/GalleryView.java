package mainScreen.components;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Text;

import java.io.IOException;
import java.io.InputStream;

public class GalleryView extends AnchorPane {
    private static final String viewFxml = "/views/components/GalleryView.fxml";

    public GalleryView() {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(viewFxml));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);
        try {
            fxmlLoader.load();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public GalleryView(String imagePath, String imageTitle) {

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
