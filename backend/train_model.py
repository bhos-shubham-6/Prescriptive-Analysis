import os
import argparse
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score


def load_data(path):
    df = pd.read_csv(path)
    return df


def build_and_train(df, random_state=42):
    if 'StudentID' in df.columns:
        df = df.drop(columns=['StudentID'])

    df = df.dropna(subset=['PlacementStatus'])

    y = (df['PlacementStatus'].astype(str).str.strip().str.lower() == 'placed').astype(int)

    feature_cols = [
        'CGPA',
        'Internships',
        'Projects',
        'Workshops/Certifications',
        'AptitudeTestScore',
        'SoftSkillsRating',
        'ExtracurricularActivities',
        'PlacementTraining',
        'SSC_Marks',
        'HSC_Marks',
    ]

    X = df[feature_cols].copy()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=random_state, stratify=y
    )

    numeric_features = [
        'CGPA',
        'Internships',
        'Projects',
        'Workshops/Certifications',
        'AptitudeTestScore',
        'SoftSkillsRating',
        'SSC_Marks',
        'HSC_Marks',
    ]
    categorical_features = [
        'ExtracurricularActivities',
        'PlacementTraining',
    ]

    numeric_transformer = Pipeline(
        steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler()),
        ]
    )

    categorical_transformer = Pipeline(
        steps=[
            ('imputer', SimpleImputer(strategy='constant', fill_value='No')),
            ('onehot', OneHotEncoder(handle_unknown='ignore')),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features),
        ]
    )

    clf = RandomForestClassifier(n_estimators=200, random_state=random_state, n_jobs=-1, class_weight='balanced')

    pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', clf)])

    print('Training model...')
    pipeline.fit(X_train, y_train)

    print('Evaluating on test set...')
    y_pred = pipeline.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f'Accuracy: {acc:.4f}')
    print('Classification report:')
    print(classification_report(y_test, y_pred))

    return pipeline


def main():
    parser = argparse.ArgumentParser(description='Train placement prediction model and save it to backend/model.joblib')
    parser.add_argument('--data', default=os.path.join(os.path.dirname(__file__), '..', 'placementdata.csv'), help='Path to placementdata.csv')
    parser.add_argument('--out', default=os.path.join(os.path.dirname(__file__), 'model.joblib'), help='Output path for the trained model')
    args = parser.parse_args()

    data_path = os.path.abspath(args.data)
    if not os.path.exists(data_path):
        print(f'ERROR: data file not found at {data_path}')
        return

    df = load_data(data_path)
    model = build_and_train(df)

    out_path = os.path.abspath(args.out)
    joblib.dump(model, out_path)
    print(f'Model saved to: {out_path}')


if __name__ == '__main__':
    main()
