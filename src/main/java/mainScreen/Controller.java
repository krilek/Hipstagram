package mainScreen;

import javafx.scene.layout.GridPane;
import mainScreen.components.GalleryItemPane;

public class Controller {

    public GridPane mainView;

    public void initialize() {
        mainView.add(new GalleryItemPane("/img/logo.jpg", "test"), 0, 0);
    }
}
