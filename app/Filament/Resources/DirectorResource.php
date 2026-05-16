<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DirectorResource\Pages;
use App\Models\Director;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DirectorResource extends Resource
{
    protected static ?string $model = Director::class;
    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Grid::make(2)->schema([
                Forms\Components\FileUpload::make('photo')->image()->directory('director')->columnSpanFull(),
                Forms\Components\TextInput::make('years_experience')->numeric()->default(20),
                Forms\Components\TextInput::make('email')->email(),
                Forms\Components\TextInput::make('phone'),
            ]),
            Forms\Components\Tabs::make('Translations')->tabs([
                Forms\Components\Tabs\Tab::make('Հայերեն (HY)')->schema([
                    Forms\Components\TextInput::make('full_name_hy')->required(),
                    Forms\Components\TextInput::make('title_hy'),
                    Forms\Components\RichEditor::make('bio_hy')->columnSpanFull(),
                    Forms\Components\Textarea::make('expertise_hy'),
                ]),
                Forms\Components\Tabs\Tab::make('English (EN)')->schema([
                    Forms\Components\TextInput::make('full_name_en')->required(),
                    Forms\Components\TextInput::make('title_en'),
                    Forms\Components\RichEditor::make('bio_en')->columnSpanFull(),
                    Forms\Components\Textarea::make('expertise_en'),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('photo'),
            Tables\Columns\TextColumn::make('full_name_hy'),
            Tables\Columns\TextColumn::make('full_name_en'),
            Tables\Columns\TextColumn::make('years_experience'),
        ])->actions([
            Tables\Actions\EditAction::make(),
        ]);
    }

    public static function canCreate(): bool
    {
        return Director::count() === 0;
    }

    public static function canDelete($record): bool { return false; }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDirector::route('/'),
            'create' => Pages\CreateDirector::route('/create'),
            'edit' => Pages\EditDirector::route('/{record}/edit'),
        ];
    }
}
