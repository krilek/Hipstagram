package mainScreen.components;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Text;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class GalleryItemPane extends GridPane {
    private static final String viewFxml = "/views/components/GalleryItemPane.fxml";
    private int id;

    @FXML
    private ImageView image;
    @FXML
    private Text title;
    public GalleryItemPane() {
        this("", "");
    }

    public GalleryItemPane(String imagePath, String imageTitle) {

        try {
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource(viewFxml));
            fxmlLoader.setRoot(this);
            fxmlLoader.setController(this);
            fxmlLoader.load();
            if (!imagePath.isEmpty()) {
                InputStream input = getClass().getResourceAsStream(imagePath);
                Image image = new Image(input);
                this.image.setImage(image);
            }
            if (!imageTitle.isEmpty()) {
                this.title.setText(imageTitle);
            }
        } catch (IOException e) {
            System.out.println("Failed to load " + viewFxml + " or given image " + imagePath + ".");
        }

    }
}
